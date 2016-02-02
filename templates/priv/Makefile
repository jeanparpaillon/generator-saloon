STYLESHEETS_sources = $(wildcard styles/*.scss)

STYLESHEETS = $(addprefix www/,$(addsuffix .css,$(basename $(STYLESHEETS_sources))))

STAMP_BOWER = .stamp-bower
SASSC = sassc

all: css

css: $(STYLESHEETS)

www/%.css: %.scss
	@mkdir -p $(@D)
	$(SASSC) $< > $@

deps: $(STAMP_BOWER)

$(STAMP_BOWER):
	bower update
	touch $@

clean:
	-rm -f $(STYLESHEETS)

distclean:
	-rm -f $(STAMP_BOWER)

.PHONY: all deps css clean distclean
