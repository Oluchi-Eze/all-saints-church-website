import { client } from '@/sanity/lib/client'

async function getSermons() {
  const query = `*[_type == "sermon"] | order(date desc)`
  const sermons = await client.fetch(query)
  return sermons
}

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    /* mt-6 on mobile keeps the title visible without too much scrolling */
    <div className="max-w-4xl mx-auto mt-6 md:mt-12 p-4 md:p-6 text-black mb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 border-b pb-4 text-blue-900">
        Recent Sermons
      </h1>
      
      <div className="grid gap-6">
        {sermons.map((sermon: any) => (
          <div 
            key={sermon._id} 
            className="p-5 md:p-8 border border-gray-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow border-l-4 border-l-blue-700"
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 leading-tight">
              {sermon.title}
            </h2>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-4 font-medium">
              <span>{new Date(sermon.date).toDateString()}</span>
              <span className="hidden md:inline">|</span>
              <span className="text-blue-600">Preacher: {sermon.preacher}</span>
            </div>

            <div className="text-gray-700 leading-relaxed italic text-sm md:text-base border-t pt-4">
              "May the words of my mouth and the meditation of our hearts be acceptable in your sight..."
            </div>
            
            {/* Added a small call to action for the future */}
            <div className="mt-4 text-blue-700 font-bold text-sm flex items-center gap-1 cursor-pointer">
              Read Full Message <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {sermons.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-gray-500">No sermons found. Add one in the Studio!</p>
        </div>
      )}
    </div>
  )
}