import consumer from "./consumer"

document.addEventListener('turbo:load', () => {
  let subscriber;
  if(location.pathname.match(/\/items\/\d/)){
    
    const itemId = location.pathname.match(/\d+/)[0]
    let subscription = consumer.subscriptions.findAll(subs => subs.identifier === 
      JSON.stringify({channel: 'CommentChannel', item_id: itemId }))[0]
  
    if (subscription){
      // If subsription already exists, remove it first
      consumer.subscriptions.remove(subscription)
    }
  
    // Then create a subscription to the current page
    subscriber = consumer.subscriptions.create({
      channel: "CommentChannel",
      item_id: itemId
    },
    {
      // ...
    })
  
    subscriber.connected = () => {
      // Called when the subscription is ready for use on the server
    }
  
    subscriber.disconnected = () => {
      // Called when the subscription has been terminated by the server
    }
  
    subscriber.received = (data) => {
      console.log(data)
      const html = `
        <div class="comment">
          <p class="user-info">${data.user.nickname}： </p>
          <p>${data.comment.text}</p>
        </div>`
      const comments = document.getElementById("comments")
      comments.insertAdjacentHTML('beforeend', html)
      const commentForm = document.getElementById("comment-form")
      commentForm.reset();
    }
  }
});
