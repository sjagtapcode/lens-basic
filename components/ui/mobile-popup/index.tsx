"use client"

import * as Popover from '@radix-ui/react-popover';
import { useLayoutEffect, useState } from 'react';
import './mobile-popup.css';
import { usePathname } from 'next/navigation';
import { DEVICES, utilDeviceDetection } from '@/lib/checkMobile';

export default function MobilePopup() {
  const [isMobile, setIsMobile] = useState(true)
  const [open, setOpen] = useState(true)
  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  const path = usePathname()
  const android = `intent://#Intent;package=app.orb.flutter;scheme=orb.ac:/${path}?referrer=app_link;end`
  const ios = `orb.ac:/${path}`

  console.log(path)

  const handleClick = () => {
    const { device } = utilDeviceDetection()
    if(device === DEVICES.ANDROID) {
      document.location = `intent://#Intent;package=app.orb.flutter;scheme=orb.ac:/${path}?referrer=app_link;end`
    } else if (device === DEVICES.IOS) {
      document.location = `orb.ac:/${path}` 
    } else {
      if(window) {
        window.location.replace(`https://orb.ac${path}`)
      }
    }
  }

  useLayoutEffect(() => {
    const { isMobile } = utilDeviceDetection()
    setIsMobile(isMobile)
  }, [])

  return (
    <Popover.Root defaultOpen open={open}>
      <Popover.Trigger className='triggerWrapper' onClick={handleToggle}>
        <div className='trigger'>
          {open ? 'X' : '!!!'}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div className='container flex flex-col gap-[10px]'>
            <div>Use Orb to view the page</div>
            {isMobile ? (
              <button onClick={handleClick} className='button bg-[#000] w-[150px] h-[40px] border-[1px] border-[#AAA] border-solid rounded-sm'>Open in Orb</button>
            ) : (
              <>
                <a href={`https://apps.apple.com/us/app/id1638461963`} target="_blank">
                  <img width={150} height={30} src="/app-download-ios.webp" />
                </a>
                <a href={`https://play.google.com/store/apps/details?id=app.orb.flutter`} target="_blank">
                  <img width={150} height={30} src="/app-download-android.png" />
                </a>
              </>
            )}
            <a href={android}>
              <button onClick={handleClick} className='button bg-[#000] w-[150px] h-[40px] border-[1px] border-[#AAA] border-solid rounded-sm'>
                {android}
              </button>
            </a>
            <a href={ios}>
              <button onClick={handleClick} className='button bg-[#000] w-[150px] h-[40px] border-[1px] border-[#AAA] border-solid rounded-sm'>
                {ios}
              </button>
            </a>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
