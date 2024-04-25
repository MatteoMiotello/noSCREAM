import { useEffect, useRef } from "react"

type SoundBarProps = {
    volume: number,
    threshold?: number
}

const SoundBar: React.FC<SoundBarProps> = ({ volume, threshold }) => {
    const divRef = useRef<HTMLDivElement>()
    const barRef = useRef<HTMLSpanElement>()

    useEffect(() => {
        if (volume > 0 && divRef.current) {
            divRef.current.style.height = `${volume}%`
        }

        if (volume > threshold) {
            divRef.current.style.backgroundColor = '#f87171'
        } else {
            divRef.current.style.backgroundColor = '#10b981'
        }
    }, [volume, threshold])

    useEffect(() => {
        if (threshold && barRef.current) {
            barRef.current.style.bottom = `${threshold}%`
        }

        
    }, [threshold])


    return <div className='w-36 flex rounded-md border relative'>
        <span ref={barRef} className="absolute text-white w-full border-b border-4 border-white">
            
        </span>
        <div ref={divRef} className='w-full bg-green-400 mt-auto rounded-md'>
        </div>

    </div>
}

export default SoundBar;