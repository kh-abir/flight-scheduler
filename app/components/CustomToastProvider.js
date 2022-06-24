import React from 'react'
import { ToastProvider } from 'react-native-toast-notifications'
import ToastContent from './ToastContent'

const CustomToastProvider = ({ children }) => {
  return (
    <ToastProvider
      placement="bottom"
      offset={50}
      duration={3000}
      swipeEnabled={true}
      animationType={'zoom-in'}
      animationDuration={100}
      renderType={{
        custom_success: (toast) => <ToastContent toast={toast} />,
        custom_warning: (toast) => <ToastContent toast={toast} />,
        custom_danger: (toast) => <ToastContent toast={toast} />,
      }}
    >
      {children}
    </ToastProvider>
  )
}

export default CustomToastProvider
