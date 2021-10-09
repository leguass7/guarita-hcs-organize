import React from 'react'
import { BiPlus } from 'react-icons/bi'
// import { FaEdit } from 'react-icons/fa'
// import { FaTrashAlt } from 'react-icons/fa'
import { IoTrash, IoSettings, IoSave } from 'react-icons/io5'
import { MdFilterList, MdEdit } from 'react-icons/md'
import { VscServerProcess } from 'react-icons/vsc'

import { Button } from './styles'

export const iconsNames = {
  filter: MdFilterList,
  plus: BiPlus,
  edit: MdEdit,
  trash: IoTrash,
  serverProc: VscServerProcess,
  settings: IoSettings,
  save: IoSave
}

export type ToolButtonProps = {
  iconName: keyof typeof iconsNames
  size?: number
  disabled?: boolean
  onClick?: () => void
  color?: string
}

export const ToolButton: React.FC<ToolButtonProps> = ({ iconName, size = 32, disabled, onClick, color }) => {
  const Icon = iconsNames[iconName]
  return (
    <Button size={size} disabled={!!disabled} onClick={onClick} color={color}>
      <Icon size={size} />
    </Button>
  )
}
