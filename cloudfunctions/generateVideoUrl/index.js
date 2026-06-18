const cloud = require('@cloudbase/node-sdk');

// 初始化 CloudBase
const app = cloud.init({
  env: 'berry-d6g4wygcqf463f0e6'
});

exports.main = async (event, context) => {
  // CORS 头
  const headers = {
    'Access-Control-Allow-Origin': 'https://daf850584821401f959b0d244fd77c5a.app.codebuddy.work',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // 处理 OPTIONS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // 解析请求体
    const body = JSON.parse(event.body || '{}');
    const { videoPath } = body;

    if (!videoPath) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing videoPath parameter' })
      };
    }

    // 生成临时签名链接（有效期 1 小时 = 3600 秒）
    const result = await app.storage().getTempFileURL({
      fileList: [videoPath],
      maxAge: 3600
    });

    if (result.fileList && result.fileList[0] && result.fileList[0].tempFileURL) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          url: result.fileList[0].tempFileURL,
          expireIn: 3600
        })
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to generate signed URL' })
      };
    }
  } catch (error) {
    console.error('Error generating video URL:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
