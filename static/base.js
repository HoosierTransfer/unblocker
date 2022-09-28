import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'



const supabase = createClient(
  'https://hxyegpdslremfvirwunq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);

const App = () => <Auth supabaseClient={supabase} />;

root.render(<Auth supabaseClient={supabase} />);
