import React, { useState } from 'react'
import { useHMSActions } from '@100mslive/react-sdk'

function JoinRoom() {
  const ENDPOINT = process.env.REACT_APP_TOKEN_ENDPOINT
  const ROOM_ID = process.env.REACT_APP_ROOM_ID

  const [username, setUsername] = useState('')
  const [selectedRole, setSelectedRole] = useState('broadcaster')
  const hmsActions = useHMSActions()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const REACT_APP_TOKEN_ENDPOINT =
      'https://prod-in2.100ms.live/hmsapi/scripted.app.100ms.live/'
    const REACT_APP_ROOM_ID = '634b79f2e08863a3f2f9059f'

    const response = await fetch(`${REACT_APP_TOKEN_ENDPOINT}api/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: `${Date.now()}`,
        role: selectedRole, //broadcaster, hls-viewer
        type: 'app',
        room_id: REACT_APP_ROOM_ID,
      }),
    })

    const { token } = await response.json()

    // Joining the room
    hmsActions.join({
      userName: username,
      authToken: token,
    })
  }

  return (
    <form className="join" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder="Enter name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select
        required
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        placeholder="Select Role"
      >
        <option>broadcaster</option>
        <option>hls-viewer</option>
      </select>

      <button type="submit">Join</button>
    </form>
  )
}

export default JoinRoom
