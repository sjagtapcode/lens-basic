"use client"

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import './mobile-popup.css';
import { usePathname } from 'next/navigation';

export default function MobilePopup({ isMobile }: { isMobile?: boolean }) {
  const [open, setOpen] = useState(true)
  const handleToggle = () => {
    setOpen((prev) => !prev)
  }
  const path = usePathname()
  console.log(path)
  return (
    <Popover.Root defaultOpen open={open}>
      <Popover.Trigger className='triggerWrapper' onClick={handleToggle}>
        <div className='trigger'>
          !!!
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div className='container flex flex-col gap-[10px]'>
            {isMobile ? (
              <a href={`https://orb.ac${path}`} target="_blank"><button className='button bg-[#000] w-[150px] h-[40px] border-[1px] border-[#AAA] border-solid rounded-sm'>Open in Orb</button></a>
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
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
