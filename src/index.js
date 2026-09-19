const TEST_NAME = "Class 7-A General Science";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      // Save test result
      if (
        url.pathname === "/api/submit" &&
        request.method === "POST"
      ) {
        return await submitResult(request, env);
      }

      // Get one student's result
      if (
        url.pathname === "/api/result" &&
        request.method === "GET"
      ) {
        return await getResult(url, env);
      }

      // Get all results
      if (
        url.pathname === "/api/results" &&
        request.method === "GET"
      ) {
        return await getAllResults(env);
      }

      // Serve SUN.TEC website files
      return await env.ASSETS.fetch(request);

    } catch (error) {

      console.error(error);

      return json(
        {
          success: false,
          error: error.message || "Server error."
        },
        500
      );
    }
  }
};


/* =========================================================
   SUBMIT RESULT
========================================================= */

async function submitResult(request, env) {

  const data = await request.json();

  const name =
    String(data.name || "").trim();

  const roll =
    String(data.roll || "").trim();

  const obtained =
    Number(data.obtained);

  const total =
    Number(data.total || 40);


  if (!name) {

    return json(
      {
        success: false,
        error: "Student name is required."
      },
      400
    );

  }


  if (!roll) {

    return json(
      {
        success: false,
        error: "Roll number is required."
      },
      400
    );

  }


  if (
    !Number.isFinite(obtained) ||
    !Number.isFinite(total) ||
    total <= 0 ||
    obtained < 0 ||
    obtained > total
  ) {

    return json(
      {
        success: false,
        error: "Invalid marks."
      },
      400
    );

  }


  const percentage =
    Number(
      ((obtained / total) * 100)
      .toFixed(2)
    );


  const now =
    new Date().toISOString();


  /*
    Save result.

    If the same student submits again,
    the previous result for this test/roll
    is updated instead of creating duplicates.
  */

  await env.DB
    .prepare(`
      INSERT INTO results
      (
        test_name,
        roll_no,
        student_name,
        obtained_marks,
        total_marks,
        percentage,
        submitted_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)

      ON CONFLICT(test_name, roll_no)

      DO UPDATE SET

        student_name =
          excluded.student_name,

        obtained_marks =
          excluded.obtained_marks,

        total_marks =
          excluded.total_marks,

        percentage =
          excluded.percentage,

        submitted_at =
          excluded.submitted_at
    `)
    .bind(
      TEST_NAME,
      roll,
      name,
      obtained,
      total,
      percentage,
      now
    )
    .run();


  /*
    Calculate class position.

    Higher marks = better position.
    Same marks = same position.
  */

  const positionRow =
    await env.DB
      .prepare(`
        SELECT position
        FROM (
          SELECT
            roll_no,

            RANK() OVER (
              ORDER BY obtained_marks DESC
            ) AS position

          FROM results

          WHERE test_name = ?
        )

        WHERE roll_no = ?
      `)
      .bind(
        TEST_NAME,
        roll
      )
      .first();


  const position =
    positionRow
      ? Number(positionRow.position)
      : null;


  return json({

    success: true,

    result: {

      school:
        "Government High School Dunyapur",

      className:
        "Class 7-A",

      subject:
        "General Science",

      preparedBy:
        "Maqsood Sandhu",

      studentName:
        name,

      rollNo:
        roll,

      obtainedMarks:
        obtained,

      totalMarks:
        total,

      percentage:
        percentage,

      position:
        position,

      submittedAt:
        now
    }

  });

}


/* =========================================================
   GET ONE RESULT
========================================================= */

async function getResult(url, env) {

  const roll =
    String(
      url.searchParams.get("roll") || ""
    ).trim();


  const name =
    String(
      url.searchParams.get("name") || ""
    ).trim();


  if (!roll) {

    return json(
      {
        success: false,
        error: "Roll number is required."
      },
      400
    );

  }


  let row;


  if (name) {

    row =
      await env.DB
        .prepare(`
          SELECT
            roll_no,
            student_name,
            obtained_marks,
            total_marks,
            percentage,
            submitted_at

          FROM results

          WHERE test_name = ?

          AND roll_no = ?

          AND LOWER(
            TRIM(student_name)
          )
          =
          LOWER(
            TRIM(?)
          )

          LIMIT 1
        `)
        .bind(
          TEST_NAME,
          roll,
          name
        )
        .first();

  } else {

    row =
      await env.DB
        .prepare(`
          SELECT
            roll_no,
            student_name,
            obtained_marks,
            total_marks,
            percentage,
            submitted_at

          FROM results

          WHERE test_name = ?

          AND roll_no = ?

          LIMIT 1
        `)
        .bind(
          TEST_NAME,
          roll
        )
        .first();

  }


  if (!row) {

    return json(
      {
        success: false,
        error: "Result not found."
      },
      404
    );

  }


  /*
    Calculate current position
  */

  const positionRow =
    await env.DB
      .prepare(`
        SELECT position

        FROM (

          SELECT
            roll_no,

            RANK() OVER (
              ORDER BY obtained_marks DESC
            ) AS position

          FROM results

          WHERE test_name = ?

        )

        WHERE roll_no = ?
      `)
      .bind(
        TEST_NAME,
        roll
      )
      .first();


  const position =
    positionRow
      ? Number(positionRow.position)
      : null;


  return json({

    success: true,

    result: {

      school:
        "Government High School Dunyapur",

      className:
        "Class 7-A",

      subject:
        "General Science",

      preparedBy:
        "Maqsood Sandhu",

      studentName:
        row.student_name,

      rollNo:
        row.roll_no,

      obtainedMarks:
        Number(row.obtained_marks),

      totalMarks:
        Number(row.total_marks),

      percentage:
        Number(row.percentage),

      position:
        position,

      submittedAt:
        row.submitted_at

    }

  });

}


/* =========================================================
   GET ALL RESULTS
========================================================= */

async function getAllResults(env) {

  const rows =
    await env.DB
      .prepare(`
        SELECT
          roll_no,
          student_name,
          obtained_marks,
          total_marks,
          percentage,
          submitted_at

        FROM results

        WHERE test_name = ?

        ORDER BY
          obtained_marks DESC,
          student_name ASC
      `)
      .bind(TEST_NAME)
      .all();


  /*
    Use RANK so students with equal marks
    receive the same position.
  */

  const rankedRows =
    await env.DB
      .prepare(`
        SELECT
          roll_no,
          RANK() OVER (
            ORDER BY obtained_marks DESC
          ) AS position

        FROM results

        WHERE test_name = ?
      `)
      .bind(TEST_NAME)
      .all();


  const positionMap =
    new Map();


  for (
    const row of rankedRows.results
  ) {

    positionMap.set(
      String(row.roll_no),
      Number(row.position)
    );

  }


  const results =
    rows.results.map(row => ({

      position:
        positionMap.get(
          String(row.roll_no)
        ) || null,

      rollNo:
        row.roll_no,

      studentName:
        row.student_name,

      obtainedMarks:
        Number(row.obtained_marks),

      totalMarks:
        Number(row.total_marks),

      percentage:
        Number(row.percentage),

      submittedAt:
        row.submitted_at

    }));


  return json({

    success: true,

    test:
      TEST_NAME,

    count:
      results.length,

    results:
      results

  });

}


/* =========================================================
   JSON RESPONSE
========================================================= */

function json(data, status = 200) {

  return new Response(
    JSON.stringify(data),

    {
      status: status,

      headers: {

        "content-type":
          "application/json; charset=UTF-8",

        "cache-control":
          "no-store",

        "access-control-allow-origin":
          "*"

      }

    }
  );

}
