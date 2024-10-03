import Link from 'next/link'


  
  type Props = {
    params: number;
    pageCount: number;
  };

export default function PaginationButtons({ params, pageCount }: Props) {
  return (
    <div className='flex items-center justify-center gap-5'>
        {params !== 1 ? (
        <Link href={(params - 1).toString()}>Previous</Link>
      ) : (
        <span className="opacity-5">Previous</span>
      )}
      {params !== pageCount ? (
        <Link href={(params + 1).toString()}>Next</Link>
      ) : (
        <span className="opacity-5">Next</span>
      )}
    </div>
  )
}
