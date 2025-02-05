# GenAI bootcamp Preweek

Considering I'm actively learning at the moment for the German certificate B2, I decided to focus on creating an assistant to help me in this journey.

Another point to consider is the fact that I'm not using any subscription based agentic models, I'm trying to make it work on the cheap side. This means that maybe somewhere along the ride I might decide to use Ollama on my local machine.

## Sentence constructor

So the project for the preweek is a sentence constructor, where we delegate the teacher role to a LLM out there.

Choosing the best in slot role is not an easy task, because I'm using the free versions of these LLMs. 

But even if German language is not an easy one, it surely is more approachable than Japanese, so the models won't necesarrily have a hard time offering good results even in the free tier.

### ChatGPT

While the GPT 4o performs much better, the free model GPT 3.5 is a decent one.

Con's: 
- it constantly ignores my prompt on not introducing in the vocabluar table other words than noun, verb, adjective, adverb
- I've tried to modify the prompt, based on the model's suggestions, but it's stil not working as expected


Pro's:
- in my testing the initial sentence rarely repeats
- the clues are decent

### Mistral

Con's:
- I've asked to sentences with min 8 word count, it produces under
- it repeats a sentence very often
- it uses German words in clues, even if I explicitly asked not to
- sentences are on the easy side, no really B2 appropriate

Pro's:
- ...

### Perplexity

Using the Claude 3.5 Sonnet free version. I haven't used the paid one, so I don't know how much better it can be.

Con's:
- for the first English sentence it picks from a very limited pool

Pro's:
- the sentences are pretty complex
- it respects the requirements, even if sometimes it provides the sentence after the vocab
- clues are decent enough

## Considerations

Considering I want to use a free tier model, probably Claude 3.5 Sonnet will be the choice.

Creating a project and seeding data into it would help a lot, I can see a challenge in diversifying the sentences from output. And I need the assistant to teach the student an increasing amount of words, so saving the state is definitely a must.

I'll take into consideration training a local model and creating a RAG database, will decide on this depending on the flow of the bootcamp.