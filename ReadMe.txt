HOW TO PUSH FILES FROM ONEDRIVE TO GITHUB

> cd OneDrive\Documents\JavaScript\Wordle\
> git status          (OPTIONAL)
> git add .
> git status
> git commit -m "Add html"  (COMMENT)
> git push


Sample session
PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle> git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html

nothing added to commit but untracked files present (use "git add" to track)
PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle> git add .
PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle> git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   index.html

PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle> git commit -m "Add html"
[main 7420011] Add html
 1 file changed, 12 insertions(+)
 create mode 100644 index.html
PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle> git status
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle> git push
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 479 bytes | 479.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/PostDoc71/Wordle.git
   fcf4462..7420011  main -> main
PS C:\Users\neuch\OneDrive\Documents\JavaScript\Wordle>