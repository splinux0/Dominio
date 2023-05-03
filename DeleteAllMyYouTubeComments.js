// Delete all comments on YouTube Google - My Activity
// 
// Generated with ChatGPT (we all lazy bum now) inspired by Jamie Mason's
// https://gist.github.com/JamieMason/7580315 unfollow.js
//
// 1. Go to https://myactivity.google.com/page?&page=youtube_comments
// (you need to be logged into your Account)
// 2. Open the Firefox Console 
// 3. Paste this code in the Firefox Console (or whatever you use)
// 4. press the Run button
//
// It will delete all comments within <Number of comments * ~1 sec> seconds more or less.
// It deletes the comments in batches asking you if you want to continue.
// In my run it was 100 messages per batch.
//
// Use at your own risk and discretion. No bla bla risk is implied or guarantee, fit for purpouse
// and other clear law jargon about how it's your responsibility to understand what you are doing in life
// an no other bla bla is implied. Don't bother me if your nuclear power plant explodes. Herein henceforth 
// inbetween hereafter words words words.
//
// This is GPL3 I guess. I don't even remember what GPL3 said but unless ChatGPT claims this is his stuff
// that's everyone's code now. OR GitHub. or Whomever. I don't care. This is a public notebook for me.
// I am actually writing to myself. Turn off the fireplate already, the coffee is burning ...
//
// Last Updated: 03 May 2022
( async () => {
  
  const scrollToTheBottom = () => window.scrollTo(0, document.body.scrollHeight);
  
  async function deleteItems() {
  const items = document.querySelectorAll(`button[aria-label^="Delete activity item"]`);
  const numItems = items.length;
  if (numItems === 0) {
    console.log("No items found");
    return 0;
  }

  const proceed = confirm(`Found ${numItems} item(s). Do you want to proceed with deletion?`);
  if (!proceed) {
    console.log("Deletion cancelled by user");
    return 0;
  }

  let numDeleted = 0;
  for (const item of items) {
    item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 3000));
    const deleteBtn = document.querySelector('div[aria-label="Delete"]');
    if (deleteBtn) {
      deleteBtn.click();
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
      numDeleted++;
    } else {
      console.log("Delete button not found");
    }
  }

  console.log(`Deleted ${numDeleted} item(s) out of ${numItems} found`);
  return numDeleted;
}
  
  async function nextBatch() {
    scrollToTheBottom()
    await new Promise(resolve => setTimeout(resolve, 3000));
    const numDeleted = await deleteItems();
    if (numDeleted === 0) {
      return;
    }
    const proceed = confirm(`Do you want to delete the next batch of items?`);
    if (proceed) {
      await nextBatch();
    } else {
      console.log("Deletion stopped by user");
    }
  }

  await nextBatch();
})();
