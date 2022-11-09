# Sprint 1 feedback

(X) tagged commit on main for sprint1
(X) set of closed user stories
(X) working deployment on Firebase
(X) GitHub reports build passing
(X) team members have completed reflection
(X) demo

## Checklist notes

I gave you credit for the tagged commit, but you called it "sprint" instead of "sprint1", which is a little less informative.

## Discussion

### User stories

I do see a collection of user story-esque items in the back log. I like that they are marked with priorities, status and points. I would like to see the addition of acceptance tests going forward -- some way to tell that the item is complete.

I called these user story-esque because many of them are not actually user stories.

"As a quiz, I want to be able to fetch questions and answers from a json."

User stories are trying to find the value for anything we build by always relating it back to some stakeholder need or desire. Quizzes are not stakeholders and have no inherent motivations, and can't drive value additions. Try not to shoehorn tasks into the user story format. Some things are tasks, and it is okay to add those to the backlog as tasks (provided they are ultimately linked to some user story).

Here is a subtler one:

"As a student and professor, I want to have a working database where questions can be inputed and pulled, so that quiz creation and access are done seamlessly"

There are a couple of issues here,:

- we won't have many users who are both student and professor
- "creation and access are done seamlessly" isn't testable - we need to define what this means. It also isn't much of a motivation for either of our users
- the database is an implementation detail and shouldn't be in the user story.

A better user story might be

As a professor, I would like student responses on quizzes to be retained so that I can review them later and chart their progress over the semester.

This is a simple feature (quiz responses are saved). We can test it (we can enter responses and then come back and they are still there). This has a real rationale for why this is a valuable feature. Note that this could be implemented with a database or JSON files. The choice of the database could be left as an implementation detail, or there might be more user stories that shove us in that direction. For example, if our professor wants to be able to handle many different courses/sections, etc, the growing complexity will naturally suggest a scalable solution.

### Agility/scrum

Your commits suggest somewhat bursty work and they appear to be dominated by Toby and Ethan. I would like to see more regular commits from across the group going foward.

### Integration

I see a lot of PRs and evidence of short lived branches. However, I also see a lot of self merges and very little in the way of actual code review happening here. It also looks like a number of those PRs are reversions. Did we have some merge issues?

### Implementation

Your implementation looks okay at the moment. I note that you have an almost complete absence of tests however. It would be good to start integrating those. Hopefully part of your plan will be to sketch out more of the structure of the whole site during this sprint as well.

### Functionality

I think this was a reasonable sprint 1 goal. You have a quiz, and it checks the answers. I think you will have to think a little bit about how to handle short answer questions since there can be variance in how people answer them.
