"use client";
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { load as cocoSSDLoad } from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs'
import { renderPredictions } from '../../utils/render-predictions';
let detectInteval
function ObjectDetction() {
    const [isLoading,setIsloading]=useState(true)
    const webcamRef=useRef(null)
    const canvasRef=useRef(null)

  const runcoco=async ()=>{
    setIsloading(true)
   const model=  await cocoSSDLoad()
   setIsloading(false);

  detectInteval= setInterval(() => {
    runObjectDetection(model)
   }, 10);
  }

  useEffect(() => {
   runcoco()
  }, [])
  
  const runObjectDetection=async(model)=>{
    if(canvasRef.current &&
        webcamRef.current!==null &&
        webcamRef.current.video?.readyState===4
    ){
        canvasRef.current.width=webcamRef.current.video.videoWidth;
        canvasRef.current.height=webcamRef.current.video.videoHeight;

        // find detected objects
        const detectedObjects=await model.detect(webcamRef.current.video,undefined,0.6)
        console.log(detectedObjects);

        const context=canvasRef.current.getContext('2d')
        renderPredictions(detectedObjects,context)
        
    }
  }
    const showVideo=()=>{
        const interval=setInterval(() => {
            if(webcamRef.current!==null && webcamRef.current.video?.readyState==4){
                const myVideoWidth=webcamRef.current.video.videoWidth;
                const myVideoHeight=webcamRef.current.video.videoHeight;
    
                webcamRef.current.video.width=myVideoWidth
                webcamRef.current.video.height=myVideoHeight
                clearInterval(interval); 
                console.log("changed");      
            }
            
        }, 500);
  
    }
  
  return (
    <div className='mt-8'>

        {isLoading?
        <p>Loading AI model...</p>
        :<div className='relative flex justify-center items-center gradient rounded-md p-1'>
        {/* webcam */}
         <Webcam  ref={webcamRef} onUserMedia={showVideo}  className='rounded-md w-full ' muted/>  
        {/* canvas */}
        <canvas ref={canvasRef} className='absolute top-0 left-0 z-99999 w-full'/>
        </div>}

    </div>
  )
}

export default ObjectDetction