import Moment from "react-moment";

export default function PastTime({ time }: { time: string }) {
  return (
    <Moment fromNow>{time}</Moment>
  )
}
