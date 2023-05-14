"use client";

type AboutError = {
  error: Error
}

export default function Error({ error }: AboutError) {
  console.warn(error)
  return (
    <div>An error ocurred</div>
  )
}
