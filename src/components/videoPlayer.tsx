import React, { useState, useRef } from 'react';
import VideoTimeline from './videoTimeline';
import VideoTrimBar from './videoTrimBar';
import type { TrimTime } from '../types/video';

interface VideoPlayerProps {
    videoSrc: string;
    duration: (duration: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, duration }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [trimTime, setTrimTime] = useState<TrimTime>({ startTime: 0, endTime: 0 });

    const handleVideoLoadedData = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const target = e.target as HTMLVideoElement;
        duration(target.duration);
        setTrimTime({ startTime: 0, endTime: target.duration });
    };

    const handleUpdateTime = () => {
        if (videoRef.current) {
            const { startTime, endTime } = trimTime;
            if (videoRef.current.currentTime < startTime) {
                videoRef.current.currentTime = startTime;
            }
            if (videoRef.current.currentTime > (endTime || videoRef.current.duration)) {
                videoRef.current.pause();
                videoRef.current.currentTime = endTime;
            }
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleChangeCurrentTime = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <div className='video-player'>
            <video ref={videoRef} controls autoPlay onLoadedData={handleVideoLoadedData} onTimeUpdate={handleUpdateTime}>
                <source src={`${videoSrc}#t=${trimTime.startTime},${trimTime.endTime}`} type="video/mp4" />
            </video>
            <VideoTimeline currentTime={currentTime} videoDuration={videoRef.current?.duration || 0} setCurrentTime={handleChangeCurrentTime} />
            <VideoTrimBar trimTime={trimTime} setTrimTime={setTrimTime} videoDuration={videoRef.current?.duration || 0} />
        </div>
    );
};
export default VideoPlayer;