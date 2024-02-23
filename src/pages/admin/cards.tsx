import CardEditor from '@/CardEditor';
import { AdminCardProvider } from '@/CardEditor/AdminCardContext';

export default function AdminAuth() {
  return (
    <AdminCardProvider>
      <CardEditor />
    </AdminCardProvider>
  );
}
