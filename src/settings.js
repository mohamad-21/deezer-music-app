const userSettings = JSON.parse(localStorage.getItem('settings'));
const settings = {
  player: {
    volume: userSettings?.player?.volume ?? 0.2,
    playMode: userSettings?.player?.playMode ?? 'normal',
    setVolume: (volume) => {
      localStorage.setItem('settings', JSON.stringify({
        ...settings,
        player: {
          ...settings.player,
          volume,
        }
      }))
    },
    setPlayMode: (playMode) => {
      localStorage.setItem('settings', JSON.stringify({
        ...settings,
        player: {
          ...settings.player,
          playMode,
        }
      }))
    }
  },
  likes: userSettings?.likes ?? [],
  toggleLike: (item) => {
    const savedLikes = JSON.parse(localStorage.getItem('settings'))?.likes;
    localStorage.setItem('settings', JSON.stringify({
      ...settings,
      likes: savedLikes?.some(music => music.id === item.id) ? savedLikes?.filter(music => music.id !== item.id) : [item, ...savedLikes]
    }))
    
  },
  getLikes: () => {
    return JSON.parse(localStorage.getItem('settings'))?.likes ?? []
  }
}

export default settings;