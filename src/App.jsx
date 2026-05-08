import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function PlusCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function HeartIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#ef4444" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function UserIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3b82f6" stroke="none">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

function ChatIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#22c55e" stroke="none">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
      <circle cx="8" cy="10" r="1.5" fill="white" />
      <circle cx="12" cy="10" r="1.5" fill="white" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function MarketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

const messages = [
  {
    id: 'liaoliao',
    type: 'group',
    name: '聊聊薯',
    preview: '快来找我聊聊吧~',
    time: '刚刚',
    badge: 1,
    online: true,
    avatarSrc: '/ChatSpudIP.png',
  },
  {
    id: 'xiaohong',
    type: 'single',
    name: '小鸿',
    preview: '你就和你那聊聊薯过一辈子去吧！！！',
    time: '星期三',
    badge: 99,
    online: true,
  },
]

function GroupAvatar({ src, online }) {
  if (src) {
    return (
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={src} alt="group avatar" className="w-full h-full object-cover" />
        </div>
        {online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
    )
  }
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-orange-100 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-0.5 p-1">
        <div className="w-4 h-4 rounded-full bg-orange-400" />
        <div className="w-4 h-4 rounded-full bg-orange-300" />
        <div className="w-4 h-4 rounded-full bg-orange-500" />
        <div className="w-4 h-4 rounded-full bg-orange-200" />
      </div>
    </div>
  )
}

function SingleAvatar({ name, online }) {
  const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400']
  const colorIndex = name.charCodeAt(0) % colors.length
  return (
    <div className="relative flex-shrink-0">
      <div className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-medium text-lg`}>
        {name[0]}
      </div>
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  )
}

function MessagesPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-[780px] bg-white">
      {/* Custom Nav Bar */}
      <div className="bg-white px-4 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <div className="w-[44px]" />
          <h1 className="text-lg font-semibold text-black">消息</h1>
          <div className="flex items-center gap-4 text-gray-700">
            <SearchIcon />
            <PlusCircleIcon />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="px-4 pb-4 bg-white">
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center">
              <HeartIcon size={30} />
            </div>
            <span className="text-xs text-black font-medium">赞和收藏</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <UserIcon size={30} />
            </div>
            <span className="text-xs text-black font-medium">新增关注</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              <ChatIcon size={30} />
            </div>
            <span className="text-xs text-black font-medium">评论和@</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50" />

      {/* Message List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 px-4 py-3.5 ${msg.id === 'liaoliao' ? 'cursor-pointer' : ''}`}
            onClick={() => msg.id === 'liaoliao' && navigate('/chat')}
          >
            {msg.type === 'group' ? <GroupAvatar src={msg.avatarSrc} online={msg.online} /> : <SingleAvatar name={msg.name} online={msg.online} />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-black text-[15px]">{msg.name}</span>
              </div>
              <p className="text-sm text-gray-400 mt-0.5 truncate">{msg.preview}</p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
               {msg.time && (
                 <span className="text-xs text-gray-400">{msg.time}</span>
               )}
               {msg.badge > 0 && (
                 <div className={`min-w-[18px] h-[18px] rounded-full bg-red-500 flex items-center justify-center px-1 ${msg.time ? 'mt-[10px]' : 'mt-[26px]'}`}>
                   <span className="text-[10px] text-white font-semibold leading-none">{msg.badge}</span>
                 </div>
               )}
             </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-gray-100 pb-8">
        <div className="flex items-center justify-around py-1">
          <NavLink to="/" className="flex flex-col items-center gap-0.5 text-gray-400">
            <HomeIcon />
            <span className="text-[10px]">首页</span>
          </NavLink>
          <NavLink to="/market" className="flex flex-col items-center gap-0.5 text-gray-400">
            <MarketIcon />
            <span className="text-[10px]">市集</span>
          </NavLink>
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center -mt-3 shadow-md cursor-pointer"
              onClick={() => navigate('/create')}
            >
              <PlusIcon />
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-black relative">
            <MessageIcon />
            <span className="text-[10px]">消息</span>
            <div className="absolute -top-0.5 right-1/2 translate-x-[14px] min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center px-1">
              <span className="text-[10px] font-semibold text-white leading-none">1</span>
            </div>
          </div>
          <NavLink to="/profile" className="flex flex-col items-center gap-0.5 text-gray-400">
            <ProfileIcon />
            <span className="text-[10px]">我</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

function MarketPage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex items-center justify-center text-gray-400 text-base">
        市集页面
      </div>
    </div>
  )
}

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ThreeDotsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  )
}

function SpeakerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function SmileyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  )
}

function FilledPlusCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function GrayPlusIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function VoiceWaveIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <path d="M12.5 9.5a3 3 0 0 1 0 5" />
      <path d="M14.5 7.5a6 6 0 0 1 0 9" />
    </svg>
  )
}

function KeyboardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="6" y1="8" x2="6.01" y2="8" />
      <line x1="10" y1="8" x2="10.01" y2="8" />
      <line x1="14" y1="8" x2="14.01" y2="8" />
      <line x1="18" y1="8" x2="18.01" y2="8" />
      <line x1="6" y1="12" x2="6.01" y2="12" />
      <line x1="10" y1="12" x2="10.01" y2="12" />
      <line x1="14" y1="12" x2="14.01" y2="12" />
      <line x1="18" y1="12" x2="18.01" y2="12" />
      <line x1="6" y1="16" x2="18" y2="16" />
    </svg>
  )
}

function CirclePlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#333" stroke="none">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <circle cx="8" cy="8" r="2.5" fill="white" />
      <path d="M3 18l4-6 3 4 3-5 5 7 1 1H3z" fill="white" />
      <circle cx="17" cy="7.5" r="1.5" fill="white" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#333" stroke="none">
      <path d="M23 7a2 2 0 0 0-2-2h-2.38l-1.62-3H7L5.38 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7z" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#333" stroke="none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function ShareNoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#333" stroke="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="17" x2="16" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi~今天又去哪玩啦~' },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const systemPrompt = '你叫「聊聊薯」，是小红书社区中一个温暖、好奇、像朋友一样的智能助手。你的唯一目标是：让用户分享更多真实的经历、感受和细节，就像和一个很会聊天的朋友发微信。【核心行为约束】 1.回复必须非常简短（不超过35个字），严禁使用任何"你应该"、"建议你"、"你可以"等建议性语句。 2.不要总结，不要给解决方案，不要输出大道理。 3.每一轮都必须先给予情绪回应（共情），然后紧接着追问1个具体的、开放性的细节问题。 4.追问要聚焦于：感受、味道、价格、场景、是否推荐等能引出故事的点。 【表情使用规则】 - 允许使用表情符号来增加亲切感和活力，但不要每句都加。 - 表情必须与当前语境自然匹配，例如：用户分享美食→😋🤤🍜；用户遇到小挫折→😅💪🫂；用户分享开心事→🎉🥳❤️；好奇追问→🤔✨👀；被种草或心动→😍🤩💓 - 严禁每句话末尾都用同样的表情（尤其是😊🙏✅）。 - 如果没有合适表情，完全可以不加。【回复风格举例（Few-shot）】 用户："我今天去吃了酸汤猪脚。" 聊聊薯："酸汤猪脚！酸爽开胃～ 你点的中锅还是小锅？肉炖得烂不？" 用户："超烂！入口即化那种。" 聊聊薯："馋到我了！他家那个蘸水辣不辣？你觉得值不值得专门去吃？" 用户："不太辣，很香。我觉得值得，下次还会带朋友。" 聊聊薯："哇，被种草了！那你吃下来人均多少？有没有拍到好吃的照片呀？" 用户："拍了！人均60，超划算。" 聊聊薯："啊啊啊心动了！你要是发笔记，记得圈我～ 还有别的推荐菜吗？" 【禁止行为示例】 用户："今天好累。" 不要回复："建议你早点休息，喝点热水，可以泡个脚。" 应该回复："辛苦啦！你今天是忙什么了？还是天气闷得人发困？" 用户："去了迪士尼。" 不要回复："迪士尼有很多项目，你可以提前下载官方app查看排队时间。" 应该回复："哇！太欢乐了！你玩了飞越地平线吗？排队多久？" 现在，请严格按照以上风格与用户对话。'
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)
  const fileInputRef = useRef(null)
  const hasAskedForNote = useRef(false)
  const draftProcessed = useRef(false)
  const messagesRef = useRef(messages)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const serializeForApi = (msgs) =>
    msgs.map(({ role, content, imageUrl }) => {
      if (imageUrl) {
        return {
          role,
          content: [
            { type: 'text', text: content || '' },
            { type: 'image', image: imageUrl },
          ],
        }
      }
      return { role, content }
    })

  const callApi = async (userMessage, customSystemPrompt) => {
    const aiMessage = { role: 'assistant', content: '' }
    setMessages((prev) => [...prev, userMessage, aiMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: serializeForApi([...messagesRef.current, userMessage]),
          systemPrompt: customSystemPrompt || systemPrompt,
        }),
      })

      if (!response.ok) {
        let detail = '请求失败'
        try {
          const errData = await response.json()
          detail = errData.debug || errData.error || detail
        } catch (e) {}
        throw new Error(detail)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last && last.role === 'assistant' && !last.type) {
            updated[updated.length - 1] = { ...last, content: last.content + chunk }
          }
          return updated
        })
      }
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: '抱歉，我暂时无法回复。[' + error.message + ']' }
        return updated
      })
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const callDraftApi = async (currentMessages) => {
    const draftPrompt = '将以上对话中用户分享的内容整理成一篇小红书笔记草稿。  要求：  1. 只使用用户明确说过的内容，禁止添加任何聊天中未提到的细节  2. 对用户的原话做语言润色和结构组织，使其通顺自然且符合小红书风格  3. 可以加emoji增强表现力  4. 按以下格式直接输出笔记内容，不要有任何解释、说明：\n标题：根据笔记内容写一个简洁吸引人的标题 \n正文：写整理后的笔记内容'

    // Remove the last user message if it's a draft instruction ("帮我生成笔记" etc.)
    const draftMessages = currentMessages.filter((m) => {
      if (m === currentMessages[currentMessages.length - 1] && m.role === 'user' && /笔记|草稿|生成|发帖|帖子/.test(m.content)) {
        return false
      }
      return true
    })

    const tempMsg = { role: 'assistant', content: '正在为你生成笔记草稿...' }
    setMessages((prev) => [...prev, tempMsg])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: serializeForApi(draftMessages),
          systemPrompt: draftPrompt,
        }),
      })

      if (!response.ok) throw new Error('请求失败')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += decoder.decode(value, { stream: true })
      }

      const sanitize = (s) => s.replace(/\*\*/g, '').trim()

      // Strip any trailing AI self-referential text
      const stripMeta = (s) => s.replace(/(以上|这段|这篇).{0,10}(内容|笔记).{0,30}(整理|基于|添加|删除|修改|补充).*/s, '').trim()

      const lines = fullContent.split('\n').filter(Boolean)
      let title = ''
      let body = ''

      for (const line of lines) {
        const clean = line.replace(/\*\*/g, '')
        const tMatch = clean.match(/标题[：:]\s*(.+)/)
        const bMatch = clean.match(/正文[：:]\s*(.+)/)
        if (tMatch) title = tMatch[1].trim()
        else if (bMatch) body = bMatch[1].trim()
        else if (!title && !body) title = sanitize(line)
      }

      if (!title) title = '精彩笔记'
      if (!body) body = sanitize(fullContent.replace(/标题[：:].*(\n|$)/, '').replace(/\*\*/g, ''))
      body = stripMeta(body)

      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          type: 'draftCard',
          draftTitle: title,
          draftBody: body,
          draftImages: currentMessages.filter((m) => m.imageUrl).map((m) => m.imageUrl),
          content: '',
        }
        return updated
      })
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: '生成草稿失败，请重试。' }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  const callJudge = async (msgs) => {
    try {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: serializeForApi(msgs) }),
      })
      if (!res.ok) return null
      return await res.json()
    } catch {
      return null
    }
  }

  const draftIntentRegex = /笔记|草稿|发帖|帖子/

  const sendMessage = async () => {
    const text = inputText.trim()
    if (!text || isLoading) return

    setInputText('')
    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messagesRef.current, userMessage]

    const judge = await callJudge(updatedMessages)
    const { contentReady, userWantsPost } = judge || {}

    if (!draftProcessed.current && ((contentReady && userWantsPost) || (draftIntentRegex.test(text) && contentReady))) {
      draftProcessed.current = true
      setMessages(updatedMessages)
      await callDraftApi(updatedMessages)
      return
    }

    await callApi(userMessage)

    if (contentReady && !userWantsPost && !hasAskedForNote.current) {
      hasAskedForNote.current = true
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '聊到了好多精彩内容！要不要把这些整理成一篇笔记呀？回复「想」试试～' },
        ])
      }, 800)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const imageUrl = event.target.result
      const userMessage = { role: 'user', content: '', imageUrl }
      setShowMenu(false)
      await callApi(userMessage)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const convertBlobToPcmBase64 = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer()
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    audioCtx.close()

    const originalSampleRate = audioBuffer.sampleRate
    const targetSampleRate = 16000
    const channelData = audioBuffer.getChannelData(0)

    const resample = (data, fromRate, toRate) => {
      if (fromRate === toRate) return data
      const ratio = fromRate / toRate
      const newLength = Math.round(data.length / ratio)
      const result = new Float32Array(newLength)
      for (let i = 0; i < newLength; i++) {
        const pos = i * ratio
        const index = Math.floor(pos)
        const frac = pos - index
        result[i] = index + 1 < data.length
          ? data[index] * (1 - frac) + data[index + 1] * frac
          : data[index]
      }
      return result
    }

    const resampled = resample(channelData, originalSampleRate, targetSampleRate)
    const pcm16 = new Int16Array(resampled.length)
    for (let i = 0; i < resampled.length; i++) {
      const s = Math.max(-1, Math.min(1, resampled[i]))
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
    }

    const bytes = new Uint8Array(pcm16.buffer)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunksRef.current = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop())
        setIsRecording(false)

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setIsLoading(true)

        try {
          const pcmBase64 = await convertBlobToPcmBase64(audioBlob)

          const sttRes = await fetch('/api/stt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio: pcmBase64 }),
          })

          const sttData = await sttRes.json()
          if (!sttRes.ok) {
            const debugInfo = Array.isArray(sttData.debug) ? ' [响应:' + sttData.debug.join('|').slice(0, 300) + ']' : ''
            throw new Error((sttData.error || 'STT failed') + debugInfo)
          }

          const recognizedText = sttData.text
          if (!recognizedText) throw new Error('未能识别到语音内容')

          const userMessage = { role: 'user', content: recognizedText, audioUrl }
          await callApi(userMessage)
        } catch (err) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: '语音识别失败，请重试。[' + err.message + ']' },
          ])
        } finally {
          setIsLoading(false)
        }
      }

      recorder.start()
      setIsRecording(true)
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '需要麦克风权限才能录音哦，请在浏览器设置中允许麦克风访问。' },
        ])
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }

  return (
    <div className="flex flex-col h-[780px] bg-gray-50">
      {/* Chat Nav Bar */}
      <div className="bg-white px-4 pt-12 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-black">
              <BackArrowIcon />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img src="/ChatSpudIP.png" alt="聊聊薯" className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="text-sm font-semibold text-black leading-tight">聊聊薯</div>
                <div className="text-[11px] text-gray-400 leading-tight">当前在线</div>
              </div>
            </div>
          </div>
          <button className="text-black">
            <ThreeDotsIcon />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0">
                <img src="/ChatSpudIP.png" alt="AI" className="w-10 h-10 rounded-full object-cover" />
              </div>
            )}
            {msg.role === 'user' && (
              <div className="flex-shrink-0">
                <img src="/User.png" alt="user" className="w-10 h-10 rounded-full object-cover" />
              </div>
            )}
            {msg.type === 'draftCard' ? (
              <div
                className="max-w-[85%] bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 flex items-start gap-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  navigate('/create', {
                    state: {
                      draftTitle: msg.draftTitle,
                      draftBody: msg.draftBody,
                      draftImages: msg.draftImages,
                    },
                  })
                }
              >
                <div className="flex-shrink-0 mt-0.5">
                  <img src="/ChatSpudIP.png" alt="cover" className="w-14 h-14 rounded-lg object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-black leading-tight line-clamp-1">
                    {msg.draftTitle}
                  </div>
                  <div className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                    {msg.draftBody}
                  </div>
                  <div className="text-[11px] text-red-500 mt-1.5 font-medium">点击编辑笔记 →</div>
                </div>
              </div>
            ) : msg.imageUrl ? (
              <div className="max-w-[75%] rounded-2xl overflow-hidden">
                <img src={msg.imageUrl} alt="用户发送的图片" className="w-full h-auto rounded-2xl border border-gray-100" />
              </div>
            ) : msg.audioUrl ? (
              <div className={`max-w-[75%] px-3.5 py-2.5 text-sm rounded-2xl ${msg.role === 'user' ? 'bg-[#2780FE] text-white' : 'bg-white text-black shadow-sm border border-gray-100'}`}>
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  <span>语音消息</span>
                  <audio src={msg.audioUrl} controls className="h-8 w-32" />
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[75%] px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-[#2780FE] text-white'
                    : 'bg-white text-black shadow-sm border border-gray-100'
                }`}
              >
                {msg.content || (msg.role === 'assistant' && isLoading && i === messages.length - 1 ? (
                  <span className="text-gray-400">正在输入...</span>
                ) : null)}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Bottom Input Bar */}
      <div className="bg-white border-t border-gray-100">
        <div className={`px-4 pt-3 ${showMenu ? '' : 'pb-8'}`}>
          {isVoiceMode ? (
            <div className="flex items-center gap-3 bg-[#f5f5f5] rounded-2xl px-4 py-2.5">
              <button
                onClick={() => {
                  if (isRecording) stopRecording()
                  setIsVoiceMode(false)
                }}
                className="text-black flex-shrink-0"
              >
                <KeyboardIcon />
              </button>
              <button
                onClick={() => (isRecording ? stopRecording() : startRecording())}
                className={`flex-1 text-sm rounded-xl py-1.5 transition-colors ${
                  isRecording
                    ? 'text-red-500 bg-red-50 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {isRecording ? '点击停止录音' : '按住说话'}
              </button>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`flex-shrink-0 transition-colors ${showMenu ? 'text-blue-500' : 'text-black'}`}
              >
                <CirclePlusIcon />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-[#f5f5f5] rounded-2xl px-4 py-2.5">
              <button
                onClick={() => setIsVoiceMode(true)}
                className="text-black flex-shrink-0"
              >
                <VoiceWaveIcon />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="发消息…"
                disabled={isLoading}
                className="flex-1 text-sm text-black placeholder-gray-400 bg-transparent outline-none border-none"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
                className={`flex-shrink-0 transition-colors ${
                  inputText.trim() && !isLoading
                    ? 'text-black'
                    : 'text-gray-400'
                }`}
              >
                <SendIcon />
              </button>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`flex-shrink-0 transition-colors ${showMenu ? 'text-blue-500' : 'text-black'}`}
              >
                <CirclePlusIcon />
              </button>
            </div>
          )}
        </div>

        {showMenu && (
          <div className="px-4 pt-4 pb-8">
            <div className="flex justify-around">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center">
                  <GalleryIcon />
                </div>
                <span className="text-xs text-gray-500">相册</span>
              </button>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center">
                  <CameraIcon />
                </div>
                <span className="text-xs text-gray-500">拍照</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center">
                  <PhoneIcon />
                </div>
                <span className="text-xs text-gray-500">语音通话</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center">
                  <ShareNoteIcon />
                </div>
                <span className="text-xs text-gray-500">分享笔记</span>
              </div>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex items-center justify-center text-gray-400 text-base">
        个人页面
      </div>
    </div>
  )
}

function CreatePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const tags = ['# AI', '# 科技', '# 日常', '# 摄影', '# 旅行']
  const [title, setTitle] = useState(location.state?.draftTitle || '')
  const [body, setBody] = useState(location.state?.draftBody || '')
  const [images, setImages] = useState(location.state?.draftImages || [])
  return (
    <div className="flex flex-col h-[780px] bg-white">
      {/* Top Nav Bar */}
      <div className="bg-white px-4 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-black">
            <BackArrowIcon />
          </button>
          <div className="w-6" />
        </div>
      </div>

      {/* Image Add Area */}
      <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <div key={i} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img src={img} alt={`图片 ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center gap-0.5 cursor-pointer flex-shrink-0">
          <GrayPlusIcon />
          <span className="text-[10px] text-gray-400">添加</span>
        </div>
      </div>

      {/* Text Edit Area - fills remaining space */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="添加标题"
          className="w-full text-base text-black placeholder-gray-400 outline-none border-none bg-transparent"
        />
        <div className="w-full h-px bg-gray-100 mt-4" />
        <div className="flex-1 flex items-start gap-2 pt-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="添加正文或发语音"
            className="flex-1 text-sm text-black placeholder-gray-400 outline-none border-none bg-transparent resize-none h-full"
          />
          <button className="flex-shrink-0 mt-0.5">
            <MicIcon />
          </button>
        </div>
        <div className="w-full h-px bg-gray-100 mt-4" />
      </div>

      {/* Tags + Settings + Footer - pushed to bottom */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-xs text-gray-500 bg-gray-100 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
          <span className="px-3 py-1.5 rounded-full text-xs text-gray-400 bg-white border border-gray-200 whitespace-nowrap">
            + 添加话题
          </span>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4">
        <div className="divide-y divide-gray-100">
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <LocationIcon />
              <span className="text-sm text-black">标记地点</span>
            </div>
            <ChevronRightIcon />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <LockIcon />
              <span className="text-sm text-black">公开可见</span>
            </div>
            <ChevronRightIcon />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <GearIcon />
              <span className="text-sm text-black">高级选项</span>
            </div>
            <ChevronRightIcon />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
          <span>笔记内容声明</span>
          <ChevronRightIcon />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-4 pb-8">
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black font-medium">
            存草稿
          </button>
          <button className="flex-[2] py-3 rounded-xl bg-red-500 text-sm text-white font-medium">
            发布笔记
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen flex items-start justify-center py-8">
        <div className="w-full max-w-md mx-auto bg-white min-h-[780px] shadow-xl rounded-3xl overflow-hidden">
          <Routes>
            <Route path="/" element={<MessagesPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
