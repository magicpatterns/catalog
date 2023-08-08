import './popover.css';
import * as PopoverPrimitive from '@radix-ui/react-popover'
import cn from 'classnames'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import React from 'react'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={4}
        className={cn('mirrorful' + '-popover-content', className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})

PopoverContent.displayName = PopoverPrimitive.Content.displayName
export { PopoverContent }
