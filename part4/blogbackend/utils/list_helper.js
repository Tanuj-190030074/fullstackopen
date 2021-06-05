


const dummy = (blogs) => {
       return 1
  }

  const totalLikes=(blogs) => {
      return blogs.reduce((totallike,x)=>totallike+=x.likes,0)
  }

  const mostBlogs=(blogs)=>{
    if (blogs.length===0) {
        return undefined
    } else {
        let authorCounts=blogs.reduce((authorCount,x)=>{
            authorCount[x.author] = (authorCount[x.author]||0)+1
            return authorCount
        }, {})
        let maxCount=Math.max(...Object.values(authorCounts))
        let mostFrequent=Object.keys(authorCounts).filter(author=>authorCounts[author]===maxCount)
        return {
            author: mostFrequent[0],
            blogs: maxCount
        }
    }
  }

  const favoriteBlog=(blogs)=>{
      if (blogs.length==0) 
      {return undefined
      }
      return blogs.reduce((maxLikes,x) =>x.likes>maxLikes.likes?x:maxLikes)
  }

  const mostLikes=(blogs)=>{
    if (blogs.length===0) {
        return undefined
    }else{
        let likesCounts=blogs.reduce((likesCount,x)=>{
            likesCount[x.author]=(likesCount[x.author]||0)+x.likes
            return likesCount
        }, {})
        let maxCount=Math.max(...Object.values(likesCounts))
        let mostLiked=Object.keys(likesCounts).filter(author=>likesCounts[author]===maxCount)
        return {
            author: mostLiked[0],
            likes: maxCount
        }
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    favoriteBlog,
    mostLikes
  }

