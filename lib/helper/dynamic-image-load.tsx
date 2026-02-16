import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getImage } from '../import-images'

export default async function DynamicImage({
    url,
    alt,
    className
}: {
    url: string
    alt?: string
    className?: string
}) {
    const { base64, img } = await getImage(url)

    return (

        <Image
            {...img}
            alt={alt || ''}
            placeholder='blur'
            blurDataURL={base64}
            className={cn(className)}
            priority
        />
    )
}