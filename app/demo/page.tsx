'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'

export default function DemoPage() {
  const [sliderValue, setSliderValue] = React.useState([50])

  return (
    <div className="container mx-auto space-y-10 py-10">
      <h1 className="text-3xl font-bold">Component Demo</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="liquid-glass-dark">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Slider</h2>
        <div className="w-[300px] space-y-2">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={sliderValue}
            onValueChange={setSliderValue}
          />
          <p className="text-muted-foreground text-sm">Value: {sliderValue}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Spinner</h2>
        <div className="flex items-center gap-4">
          <Spinner />
          <Spinner className="text-primary size-8" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Textarea</h2>
        <div className="max-w-md">
          <Textarea placeholder="Type your message here..." />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sonner (Toast)</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
                action: {
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
              })
            }
          >
            Show Toast
          </Button>
          <Button variant="outline" onClick={() => toast.success('Success!!')}>
            Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error('Error occurred')}
          >
            Error Toast
          </Button>
        </div>
      </section>
    </div>
  )
}
