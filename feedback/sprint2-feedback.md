# Sprint 2 feedback

(X) tagged commit on main for sprint2
(X) set of closed user stories
(X) working deployment on Firebase
(X) GitHub reports build passing
(X) team members have completed reflection
(X) demo

## Checklist notes

## Discussion

### User stories

We talked some more about user stories during the sprint planning, so you know that what you have in your backlog isn't quite correct.

The important points are

- _every_ feature must be motivated by a user story
- implementation details should not be present in the user story, but the motivation contained in them may suggest certain approaches
- you should consider all legitimate stakeholders. Quizzes are not stakeholders. You should not use "site admin" as a "write what I want" feature dump
- You can add items to the backlog that aren't user stories if it makes it easier to keep track of what needs to be done. However, they should be linked to user stories and support them in some way.
- Your user stories should be testable. There should be some way to know that you have accomplished them.

So, for example, you wouldn't talk about databases in the user story, you would talk about being able to review old answers (which implies some data storage). You don't talk about authentication, you talk about wanting your work to be private.

"As a student, I want to have custom hooks to pull questions from the database." ... said no student ever (well, no student who wasn't actively implementing such a system). Students want to be able to be able to see the questions for the current quiz so they can asses their progress in the course.

### Agility/scrum

It looks like your group is putting in some consistent work now. Ethan and Toby are still dominating the commits however. Remember to use the [co-authored-by](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) text to your commit messages if you are working together.

### Integration

I'm not seeing much conversation in the PRs, but at least you don't seem to be breaking the build or self merging.

### Implementation

I think I would encourage you to adopt a Layout component as demonstrated in the final practical. You don't want to be duplicating the menu code on every page.

If you want to create new pages, you don't need to make folders. For example, instead of `Professor/index.js`, you could have just made `Professor.js` at the top level.

You don't want to call all of your page components `Main`. While they are the default exports so you can call them what you like on import, this is just going to confuse you down the road.

There are no tests.

### Functionality

You are making reasonable progress (I'm glad you got auth tied in), but there is much to be done. Hopefully at this point you have an achievable goal which leaves you with some minimal viable product at the end of the sprint.
