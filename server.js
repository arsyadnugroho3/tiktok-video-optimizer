const FRONTEND_HTML = "<!doctype html><html lang=\"id\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>VideoForge — TikTok Optimizer</title><style>*{box-sizing:border-box}body{margin:0;background:#080a0f;color:#f5f7fb;font-family:system-ui,sans-serif}header{height:72px;padding:0 6%;border-bottom:1px solid #252936;display:flex;align-items:center;justify-content:space-between}.logo{font-weight:800}.badge{border:1px solid #303543;border-radius:99px;padding:8px 12px;color:#aeb5c6;font-size:12px}main{max-width:900px;margin:auto;padding:55px 20px}.hero{text-align:center;margin-bottom:30px}.hero p{font-size:11px;letter-spacing:3px;color:#929bb0}.hero h1{font-size:clamp(36px,6vw,62px);line-height:1.05;margin:12px 0}.hero h1 span{background:linear-gradient(90deg,#ff397d,#9b78ff);-webkit-background-clip:text;color:transparent}.hero div,.drop p,footer{color:#8e97aa}.card{background:#11151e;border:1px solid #292f3c;border-radius:24px;padding:20px}.drop{min-height:300px;border:1px dashed #404758;border-radius:18px;text-align:center;padding:30px;display:flex;flex-direction:column;align-items:center;justify-content:center}.icon{font-size:30px;width:62px;height:62px;border-radius:17px;background:#1a1e29;display:grid;place-items:center;color:#b589ff}.drop h2{margin:15px 0 5px}.drop button,.primary{border:0;color:white;background:linear-gradient(90deg,#ff397d,#8d70ff);font-weight:800;border-radius:11px;padding:13px 22px;cursor:pointer}.drop small{margin-top:15px;color:#687184}.hidden{display:none!important}.info{display:flex;justify-content:space-between;align-items:center;background:#151a24;padding:15px;border-radius:13px}.info span{display:block;color:#8992a5;font-size:12px;margin-top:4px}.info button,.result button{border:1px solid #303746;background:#1a1f2a;color:#ccd2de;padding:10px 15px;border-radius:10px}.settings{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}.settings>div{background:#141923;border-radius:14px;padding:16px}.settings label{font-size:10px;color:#788195;letter-spacing:1.5px}.options{display:flex;gap:7px;margin-top:10px}.options button{flex:1;border:0;background:#1d222e;color:#a5adbd;padding:10px;border-radius:9px}.options button.selected{background:#36264e;color:#fff;outline:1px solid #936bd1}.wide{grid-column:1/-1;width:100%;margin-top:2px;text-align:center}.processing,.result{margin-top:18px;background:#141923;border-radius:15px;padding:20px}.processing>div:first-child{display:flex;justify-content:space-between}.bar{height:11px;background:#272d3a;border-radius:99px;overflow:hidden;margin:14px 0}.bar i{display:block;width:0;height:100%;background:linear-gradient(90deg,#ff397d,#8d70ff)}.processing p,.result p{color:#8b94a7;font-size:13px}.check{font-size:24px;color:#65e0ae}.result video{width:100%;max-height:600px;border-radius:12px;background:#000}.result a{display:block;margin:15px 0 8px;text-decoration:none}footer{text-align:center;font-size:11px;margin-top:18px}@media(max-width:650px){main{padding-top:32px}.settings{grid-template-columns:1fr}.hero h1{font-size:40px}}</style></head><body><header><div class=\"logo\">◆ VideoForge</div><div class=\"badge\">TikTok Optimizer</div></header><main><section class=\"hero\"><p>PRO VIDEO PROCESSING</p><h1>Optimalkan video untuk<br><span>upload berkualitas tinggi.</span></h1><div>Upload video, pilih resolusi & FPS, lalu proses dengan FFmpeg secara real-time.</div></section><section class=\"card\"><div id=\"drop\" class=\"drop\"><input id=\"file\" type=\"file\" accept=\"video/*\" hidden><div class=\"icon\">↑</div><h2>Drop video di sini</h2><p>atau pilih file dari perangkat</p><button id=\"choose\">Pilih Video</button><small>MP4, MOV, WEBM • Maks. 1 GB</small></div><div id=\"info\" class=\"info hidden\"><div><b id=\"filename\"></b><span id=\"meta\"></span></div><button id=\"change\">Ganti</button></div><div id=\"settings\" class=\"settings hidden\"><div><label>RESOLUSI</label><div class=\"options\" id=\"quality\"><button data-v=\"1080p\" class=\"selected\">1080p</button><button data-v=\"2k\">2K</button><button data-v=\"4k\">4K</button></div></div><div><label>FRAME RATE</label><div class=\"options\" id=\"fps\"><button data-v=\"30\">30 FPS</button><button data-v=\"60\" class=\"selected\">60 FPS</button><button data-v=\"120\">120 FPS</button></div></div><button id=\"start\" class=\"primary wide\">⚡ Mulai Optimasi</button></div><div id=\"processing\" class=\"processing hidden\"><div><span id=\"status\">Memproses…</span><b id=\"percent\">0%</b></div><div class=\"bar\"><i id=\"bar\"></i></div><p id=\"detail\">Menyiapkan FFmpeg…</p></div><div id=\"result\" class=\"result hidden\"><div class=\"check\">✓</div><h2>Video selesai dioptimalkan</h2><p id=\"resultMeta\"></p><video id=\"preview\" controls playsinline></video><a id=\"download\" class=\"primary wide\" download>⬇ Download Video</a><button id=\"again\" class=\"wide\">Optimasi Video Lain</button></div></section><footer>Hasil diproses di server. Gunakan hanya pada video yang boleh kamu upload.</footer></main><script>const $=s=>document.querySelector(s);let fileId,quality='1080p',fps=60;$('#choose').onclick=()=>$('#file').click();$('#change').onclick=()=>$('#file').click();$('#file').onchange=e=>e.target.files[0]&&load(e.target.files[0]);['dragenter','dragover'].forEach(x=>$('#drop').addEventListener(x,e=>{e.preventDefault();$('#drop').classList.add('drag')}));$('#drop').addEventListener('drop',e=>{e.preventDefault();let f=e.dataTransfer.files[0];if(f)load(f)});document.querySelectorAll('#quality button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#quality button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');quality=b.dataset.v});document.querySelectorAll('#fps button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#fps button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');fps=+b.dataset.v});async function load(f){if(!f.type.startsWith('video/'))return alert('Pilih video.');let fd=new FormData;fd.append('video',f);$('#filename').textContent=f.name;$('#meta').textContent='Menganalisis…';$('#drop').classList.add('hidden');$('#info').classList.remove('hidden');try{let r=await fetch('/api/analyze',{method:'POST',body:fd}),j=await r.json();if(!r.ok)throw Error(j.error||`Gagal menganalisis video (HTTP ${r.status})`);fileId=j.fileId;let i=j.info;$('#meta').textContent=`${i.width}×${i.height} • ${i.fps.toFixed(2)} FPS • ${fmt(i.duration)} • ${i.codec}`;$('#settings').classList.remove('hidden')}catch(e){alert(e.message);location.reload()}}$('#start').onclick=async()=>{$('#settings').classList.add('hidden');$('#info').classList.add('hidden');$('#processing').classList.remove('hidden');try{let r=await fetch('/api/optimize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fileId,quality,fps})}),text=await r.text(),j={};try{j=JSON.parse(text)}catch{}if(!r.ok)return alert(j.error||`Gagal memproses video (HTTP ${r.status})`);if(!j.jobId)return alert('Server tidak mengembalikan Job ID.');poll(j.jobId)}catch(e){alert('Gagal terhubung ke server: '+e.message)}};async function poll(id){try{let r=await fetch('/api/jobs/'+id),j=await r.json();if(j.status==='error')return alert(j.error||'FFmpeg gagal memproses video.');$('#percent').textContent=Math.round(j.progress)+'%';$('#bar').style.width=j.progress+'%';$('#detail').textContent=`${quality.toUpperCase()} • ${fps} FPS • FFmpeg encoding`;if(j.status==='done'){$('#processing').classList.add('hidden');$('#result').classList.remove('hidden');$('#resultMeta').textContent=`${quality.toUpperCase()} • ${fps} FPS` ;$('#preview').src=j.output;$('#download').href=j.output}else setTimeout(()=>poll(id),500)}catch(e){alert('Gagal membaca status proses: '+e.message)}}$('#again').onclick=()=>location.reload();function fmt(s){let m=Math.floor(s/60),x=Math.round(s%60);return`${m}:${String(x).padStart(2,'0')}`}</script></body></html>";

const express=require('express'),multer=require('multer'),cors=require('cors'),fs=require('fs'),path=require('path'),{spawn,execFile}=require('child_process'),crypto=require('crypto');

const app=express(),PORT=process.env.PORT||3000,ROOT=__dirname,UPLOADS=path.join(ROOT,'uploads'),OUTPUTS=path.join(ROOT,'outputs');

[UPLOADS,OUTPUTS].forEach(d=>fs.mkdirSync(d,{recursive:true}));
app.use(cors());
app.use(express.json());
app.use('/outputs',express.static(OUTPUTS));

const upload=multer({
  dest:UPLOADS,
  limits:{fileSize:1024*1024*1024},
  fileFilter:(_,f,cb)=>cb(
    /^video\//.test(f.mimetype)?null:new Error('Only video files are allowed'),
    /^video\//.test(f.mimetype)
  )
});

const jobs=new Map();

function ffprobe(file){
  return new Promise((resolve,reject)=>{
    execFile(
      'ffprobe',
      ['-v','error','-print_format','json','-show_format','-show_streams',file],
      {maxBuffer:5e6},
      (e,out)=>{
        if(e)return reject(e);
        try{
          let d=JSON.parse(out),
              v=d.streams.find(s=>s.codec_type==='video');
          if(!v)throw Error('No video stream');
          let [a,b]=(v.avg_frame_rate||'0/1').split('/').map(Number),
              fps=b?a/b:Number(a);
          resolve({
            width:v.width,
            height:v.height,
            fps:fps||0,
            codec:v.codec_name||'unknown',
            bitrate:Number(v.bit_rate||d.format?.bit_rate||0),
            duration:Number(v.duration||d.format?.duration||0),
            size:Number(d.format?.size||0)
          });
        }catch(x){
          reject(x);
        }
      }
    )
  })
}

const sizes={
  "1080p":[1920,1080],
  "2k":[2560,1440],
  "4k":[3840,2160]
};

app.post('/api/analyze',upload.single('video'),async(req,res)=>{
  if(!req.file)return res.status(400).json({error:'No video uploaded'});
  try{
    res.json({
      fileId:path.basename(req.file.path),
      info:await ffprobe(req.file.path)
    });
  }catch(e){
    fs.unlink(req.file.path,()=>{});
    res.status(400).json({
      error:'Could not analyze video. Install FFmpeg/ffprobe first.'
    });
  }
});

app.post('/api/optimize',async(req,res)=>{
  let{fileId,quality='1080p',fps=60}=req.body||{};

  if(!fileId||/[\\/]/.test(fileId))
    return res.status(400).json({error:'Invalid fileId'});

  let input=path.join(UPLOADS,fileId);

  if(!fs.existsSync(input))
    return res.status(404).json({error:'Source video not found'});

  let id=crypto.randomUUID(),
      out=path.join(OUTPUTS,id+'.mp4'),
      [w,h]=sizes[String(quality).toLowerCase()]||sizes['1080p'],
      target=[30,60,120].includes(Number(fps))?Number(fps):60;

  jobs.set(id,{status:'starting',progress:0});

  try{
    let info=await ffprobe(input),
        vf=[
          `scale=${w}:${h}:force_original_aspect_ratio=decrease`,
          `pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2`
        ];

    if(target===120&&info.fps<120)
      vf.push('minterpolate=fps=120:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1');
    else
      vf.push(`fps=${target}`);

    let args=[
      '-y',
      '-i',input,
      '-vf',vf.join(','),
      '-c:v','libx264',
      '-preset','veryfast',
      '-crf','18',
      '-profile:v','high',
      '-pix_fmt','yuv420p',
      '-movflags','+faststart',
      '-c:a','aac',
      '-b:a','192k',
      '-ar','48000',
      '-progress','pipe:1',
      '-nostats',
      out
    ];

    let p=spawn('ffmpeg',args);

    jobs.get(id).status='processing';

    let buf='',err='';

    p.stdout.on('data',c=>{
      buf+=c;
      let lines=buf.split(/\r?\n/);
      buf=lines.pop();

      let ms=null;

      for(let l of lines){
        let[k,v]=l.split('=');
        if(k==='out_time_ms')ms=Number(v);
        if(k==='progress'&&v==='end')ms=info.duration*1e6;
      }

      if(ms!=null&&info.duration)
        jobs.get(id).progress=Math.min(
          100,
          Math.round(ms/(info.duration*1e6)*1000)/10
        );
    });

    p.stderr.on('data',c=>err+=c);

    p.on('close',code=>{
      if(code===0&&fs.existsSync(out)){
        jobs.set(id,{
          status:'done',
          progress:100,
          output:`/outputs/${id}.mp4`
        };
        fs.unlink(input,()=>{});
      }else{
        jobs.set(id,{
          status:'error',
          progress:0,
          error:err.slice(-1500)||'FFmpeg failed'
        };
        fs.unlink(out,()=>{});
      }
    });

  }catch(e){
    jobs.set(id,{
      status:'error',
      progress:0,
      error:e.message
    };
  }

  res.json({jobId:id});
});

app.get('/api/jobs/:id',(req,res)=>{
  let j=jobs.get(req.params.id);
  if(!j)return res.status(404).json({error:'Job not found'});
  res.json(j);
});

app.use((e,req,res,next)=>
  res.status(400).json({error:e.message||'Request failed'})
);

app.get('/',(_,res)=>
  res.type('html').send(FRONTEND_HTML)
);

app.listen(PORT,()=>console.log('Running on http://localhost:'+PORT));
