import { redirect } from 'next/navigation'

// Events page is replaced by Blog — redirect to /blog
const EventsPage = () => {
  redirect('/blog')
}

export default EventsPage