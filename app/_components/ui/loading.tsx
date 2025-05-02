type LoadingProps = {
  size?: 'xxs' | 'xs' | 'sm' | 'md',
  color?: 'white' | 'gray',
}

export function Loading({ size = 'md', color = 'gray' }: LoadingProps) {
  let classSize = ''

  switch (size) {
  case 'xxs':
    classSize = 'h-3 w-3'
    break
  case 'xs':
    classSize = 'h-4 w-4'
    break
  case 'sm':
    classSize = 'h-6 w-6'
    break
  default:
    classSize = 'h-10 w-10'
    break
  }


  return (
    <div className={`${color === 'white' ? 'text-white' : 'text-gray-300'} inline-block ${classSize} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}>
    </div>
  )
}