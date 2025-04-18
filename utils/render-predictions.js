import { throttle } from "lodash"



export const renderPredictions=(renderPredictions,ctx)=>{
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

    // font
     const font="16px sans-serif"
     ctx.font=font
     ctx.textBaseline="top";
     renderPredictions.forEach(prediction => {
        const[x,y,width,height]=prediction['bbox']
        const isPerson=prediction.class=="person"
        // bounding box
        ctx.strokeStyle=isPerson?"#FF0000":"#00FFFF"
        ctx.lineWidth=4;
        ctx.strokeRect(x,y,width,height);
// filling the color
        ctx.fillStyle=`rgba(225,0,0,${isPerson?0.2:0})`
        ctx.fillRect(x,y,width,height)
        // draw label
        ctx.fillStyle=isPerson?"#FF0000":"#00FFFF"
        const textWidth=ctx.measureText(prediction.class).width
        const textHeight=parseInt(font,10)
        ctx.fillRect(x,y,textWidth+4,textHeight+4)
        ctx.fillStyle="#000000"
        ctx.fillText(prediction.class,x,y)

        if(isPerson){
                playAudio()
        }
     });
}  
     const playAudio=throttle(()=>{
        const audio=new Audio('/danger-alarm.mp3')
        audio.play()
     },2000)