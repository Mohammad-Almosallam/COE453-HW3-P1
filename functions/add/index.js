const functions = require("@google-cloud/functions-framework");

functions.http("add", (req, res) => {
  // Extract numbers from request body with default values
  const X = req.body.X;
  const Y = req.body.Y;

  // Check for missing or invalid numbers
  if (X === undefined || Y === undefined) {
    // Differentiate missing vs. one number provided (informative message)
    if (X === undefined && Y === undefined) {
      res.status(400).send("both numbers (X and Y) are needed.");
    } else {
      const missingAttribute = X === undefined ? "X" : "Y";
      res.status(400).send(`missing attribute: ${missingAttribute}`);
    }
    return;
  }

  const result = parseFloat(X) + parseFloat(Y);

  // Format the sum response with error handling
  const sumResponse = isNaN(result)
    ? "Provide two numbers."
    : `result is ${result}`;

  res.send(sumResponse);
});
