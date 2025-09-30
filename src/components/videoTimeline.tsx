import { formatTime } from '../utils/video'

interface VideoTimelineProps {
    currentTime: number;
    videoDuration: number;
    setCurrentTime: (time: number) => void;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ currentTime, videoDuration, setCurrentTime }) => {
    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
    };

    return (
        <div className='video-timeline'>
            <p>{formatTime(currentTime)}</p>
            <input type="range" min="0" max={videoDuration} value={currentTime} onChange={handleChangeTime} />
            <p>{formatTime(videoDuration)}</p>
        </div>
    );
};

export default VideoTimeline;
