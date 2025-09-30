import { Slider } from '@mui/material';
import { formatTime } from '../utils/video';
import type { TrimTime } from '../types/video';

interface VideoTrimBarProps {
    trimTime: TrimTime;
    setTrimTime: (time: TrimTime) => void;
    videoDuration: number;
}

const VideoTrimBar = ({ setTrimTime, trimTime, videoDuration }: VideoTrimBarProps) => {

    const handleChangeTrimTime = (event: Event, value: number[], activeThumb: number) => {
        const [start, end] = value;
        setTrimTime({ startTime: start, endTime: end });
    }

    return (
        <div className='video-trim-bar'>
            <p>{formatTime(trimTime.startTime)}</p>
            <Slider
                className='trim-slider'
                value={[trimTime.startTime, trimTime.endTime]}
                onChange={handleChangeTrimTime}
                min={0}
                max={videoDuration}
            />
            <p>{formatTime(trimTime.endTime)}</p>
        </div>
    )
}

export default VideoTrimBar;
