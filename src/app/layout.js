import 'antd/dist/reset.css';
import './globals.css';

export const metadata = {
  title: 'Report card',
  description: 'Health report card',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
