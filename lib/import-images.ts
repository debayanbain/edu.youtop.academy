"use server"

import { getPlaiceholder } from 'plaiceholder'
import fs from 'node:fs/promises';
export async function getImage(src: string) {
  const buffer = await fs.readFile(`public${src}`);
  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer)

  return {
    ...plaiceholder,
    img: { src, height, width }
  }
}