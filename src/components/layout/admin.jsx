
import Sidebar from '@/components/admin/Sidebar'
import TopMenu from '@/components/admin/TopMenu'
import ConfirmModal from '../modals/ConfirmModal'
import { useSocket } from '@/hooks/useSocket'

export function AdminLayout({ children }) {
  useSocket()
  return (
    <main className='h-screen overflow-hidden'>
      <div className='grid grid-cols-[2fr_8fr] h-full'>
        {/* sidebar  */}
        <aside className='h-full'>
          <Sidebar />
        </aside>

        {/* right content  */}
        <div className='flex flex-col h-full min-h-0'>
          <div className='sticky top-0 z-10 bg-white'>
            <TopMenu />
          </div>
          <div className='flex-1 min-h-0 overflow-y-auto bg-gray-200 p-4'>
            {children}
            <ConfirmModal name='CONFIRM_MODAL' />
          </div>
        </div>
      </div>
    </main>
  )
}