# Final feedback

(X) tagged commit on main for sprint3
(X) set of closed user stories
(X) working deployment on Firebase
(X) GitHub reports build passing
( ) team members have completed reflection
(X) presentation
(X) demo
(X) report
( ) README has full deployment instructions

## Checklist notes

The README has no details about how to setup and deploy this project for future developers.

## Discussion

### User stories

The user stories appear to have improved. I would still like to see acceptance tests -- how do you know that you have accomplished your goal?

I see some good labeling of sprint and story points in the backlog as well.

### Agility/scrum

Your pattern of commits bears out your description of the velocity of your group. After a sporadic pattern of commits for the first two sprints, you did a lot of work, and it looks like you maintained a good steady pattern of commits all week. The commits are definitely dominated by half of the group. I hope that the other half was able to find ways to contribute as well (ideally as pair programmers uncredited on github and peer reviewers).

### Integration

You produced a lot of PRs without appearing to break the build. I see that you are not self merging (I believe your group set the new setting that prevents that from happening). I don't see much evidence that you are taking the opportunity to do much peer reviewing however.

### Implementation

Tests would have been good.

Your team wrote a lot of code. I like to see the number of components and the use of hooks. You made the right choice by taking a moment to add a Layout component. I would have gone a little farther and made the navbar its own component as well.

One thing I notice is the number of uses of onSnapshot in the hooks. That is probably not really required at all in this project. The only place where I would think that it would be useful would be if the professor was watching results coming in live. Besides that there is no need for real time updates in this application.

### Functionality

Functionality wise, you covered the bases. There aren't significant bugs that stop someone from using the site as intended.

That said, there were certainly opportunities to improve the site from a UI/UX perspective. Everything takes a couple more clicks than it seems like it really should. Everything also feels slightly oversized and simplistic. I think this partially comes from starting with the very simplistic quiz model that you started with and growing out around it.

## Final thoughts

You have come a long way since sprint 2. I wasn't sure after our last round of demos that either proficiency tracker was going to make it past the sample quiz phase. Your group has managed to put together a coherent site. I am truly impressed at how much you got done in this last sprint. We aren't quite at a point where I would be ready to use the site, but one could make an argument that it could be used in a pinch, which is more than many 312 projects can say.

It seems that your team has had a lot of positive growth through the process, which is, after all the purpose of the course. I do think that since you were roughly targeting Pete and myself that you could have made an effort to consult us more about how we would work. It would have helped a bit, but more importantly, involving your clients is a key aspect of Agile programming that we too often can't emulate.
