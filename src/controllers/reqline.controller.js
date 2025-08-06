const { parseAndExecuteReqline } = require('../services/reqline.service');

exports.handleReqline = async (req, res) => {
  try {
    const { reqline } = req.body;
    if (!reqline) {
      return res.status(400).json({ 
        error: true, 
        message: "Missing reqline in request body" 
      });
    }

    const result = await parseAndExecuteReqline(reqline);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ 
      error: true, 
      message: error.message 
    });
  }
};