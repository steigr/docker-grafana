IMAGE    ?= $(USER)/$(shell basename $(CURDIR))
VERSION  ?= $(shell git branch | grep \* | cut -d ' ' -f2)
ARGS     ?= --publish=3000:3000

all: image
	@true

image:
	@set -- docker build --tag=$(IMAGE):$(VERSION) \
	  --build-arg=GRAFANA_VERSION=$(VERSION) \
	  --build-arg=LABEL_BUILD_DATE=$$(date -u '+%FT%T.%UZ') \
	  --build-arg=LABEL_VCS_REF=$$(git log --pretty=format:'%h' -n 1) \
	  . \
	&& set -x && exec "$$@"

push: image
	docker push $(IMAGE):$(VERSION)

run: image
	docker run $(ARGS) --rm --name=$(shell basename $(IMAGE)) $(IMAGE):$(VERSION)

debug: image
	docker run $(ARGS) --entrypoint=bash --tty --interactive --rm --name=$(shell basename $(IMAGE)) $(IMAGE):$(VERSION)
