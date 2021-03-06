const { checkToken } = require('../utils/token');
const { CHECK_EXCLUDES } = require('../utils/config');

module.exports = (req, res, next) => {
  if (CHECK_EXCLUDES.includes(req.url)) {
    next();
    return;
  }

  const result = checkToken(req.headers['authorization']);
  // token 过期
  if (!result) {
    res.status(200).json({ success: false, message: '请重新登录', code: 10000 });
    return;
  }
  // 将登录用户信息保存下来
  req.session = result;
  next();
};
