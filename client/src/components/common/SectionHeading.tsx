interface SectionHeadingProps {
  title: string
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <h2 className="text-2xl font-bold mb-8 tracking-wide">
      {title}
      <span className="text-festival-purple">...</span>
    </h2>
  )
}