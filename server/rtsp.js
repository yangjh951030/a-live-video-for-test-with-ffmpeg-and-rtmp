const NodeMediaServer = require('node-media-server');
 // rtmp的设置
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    // gop_cache: false, // 这个没有cache老是前端爆红字
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    // mediaroot:'./media'
  },
//   trans: { // 可以转成mp4，需要在http设置mediaroot和下面的设置
//     ffmpeg: '../../../ffmpeg/ffmpeg-N-100672-gf3f5ba0bf8-win64-gpl-shared/bin/ffmpeg.exe',
//     tasks: [
//         {
//             app: 'live',
//             mp4: true,
//             mp4Flags: '[movflags=frag_keyframe+empty_moov]',
//         }
//         ]
//     }
};
const MediaServer = new NodeMediaServer(config)
module.exports = MediaServer;