MOCHA_OPTS= --check-leaks
TESTS = test.js
REPORTER ?= list

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl \
		--ui tdd\
		$(MOCHA_OPTS) \
		$(TESTS)

.PHONY: test