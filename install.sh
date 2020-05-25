rm -Rf ./.git

slugify() {
  echo "$1" | iconv -t ascii//TRANSLIT | sed -E s/[~\^]+//g | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z
}

echo Hi 👋
echo Welcome to the installer!
echo • What\'s your project fullname?

read fullname

echo
echo • Ok! What\'s your project shortname?

read shortname

echo
echo • Ok cool! And last question: Can you choose an acronym for your project?

read acronym
acronym_l="$(tr [A-Z] [a-z] <<< "$acronym")"

slug=$(slugify "$fullname")

# app.config.js
find . -type f -name "*.md" -exec sed -i.bak 's/<<FULLNAME>>/'"${fullname}"'/g' {} \;
find . -type f -name "*.js" -exec sed -i.bak 's/<<FULLNAME>>/'"${fullname}"'/g' {} \;
find . -type f -name "*.scss" -exec sed -i.bak 's/<<FULLNAME>>/'"${fullname}"'/g' {} \;
find . -type f -name "*.html" -exec sed -i.bak 's/<<FULLNAME>>/'"${fullname}"'/g' {} \;
find . -type f -name "*.json" -exec sed -i.bak 's/<<FULLNAME>>/'"${fullname}"'/g' {} \;
find . -type f -name "*.vue" -exec sed -i.bak 's/<<FULLNAME>>/'"${fullname}"'/g' {} \;

find . -type f -name "*.md" -exec sed -i.bak 's/<<SHORTNAME>>/'"${shortname}"'/g' {} \;
find . -type f -name "*.js" -exec sed -i.bak 's/<<SHORTNAME>>/'"${shortname}"'/g' {} \;
find . -type f -name "*.scss" -exec sed -i.bak 's/<<SHORTNAME>>/'"${shortname}"'/g' {} \;
find . -type f -name "*.html" -exec sed -i.bak 's/<<SHORTNAME>>/'"${shortname}"'/g' {} \;
find . -type f -name "*.json" -exec sed -i.bak 's/<<SHORTNAME>>/'"${shortname}"'/g' {} \;
find . -type f -name "*.vue" -exec sed -i.bak 's/<<SHORTNAME>>/'"${shortname}"'/g' {} \;

find . -type f -name "*.md" -exec sed -i.bak 's/<<SLUG>>/'"${slug}"'/g' {} \;
find . -type f -name "*.js" -exec sed -i.bak 's/<<SLUG>>/'"${slug}"'/g' {} \;
find . -type f -name "*.scss" -exec sed -i.bak 's/<<SLUG>>/'"${slug}"'/g' {} \;
find . -type f -name "*.html" -exec sed -i.bak 's/<<SLUG>>/'"${slug}"'/g' {} \;
find . -type f -name "*.json" -exec sed -i.bak 's/<<SLUG>>/'"${slug}"'/g' {} \;
find . -type f -name "*.vue" -exec sed -i.bak 's/<<SLUG>>/'"${slug}"'/g' {} \;

find . -type f -name "*.md" -exec sed -i.bak 's/<<ACRONYM>>/'"${acronym}"'/g' {} \;
find . -type f -name "*.js" -exec sed -i.bak 's/<<ACRONYM>>/'"${acronym}"'/g' {} \;
find . -type f -name "*.scss" -exec sed -i.bak 's/<<ACRONYM>>/'"${acronym}"'/g' {} \;
find . -type f -name "*.html" -exec sed -i.bak 's/<<ACRONYM>>/'"${acronym}"'/g' {} \;
find . -type f -name "*.json" -exec sed -i.bak 's/<<ACRONYM>>/'"${acronym}"'/g' {} \;
find . -type f -name "*.vue" -exec sed -i.bak 's/<<ACRONYM>>/'"${acronym}"'/g' {} \;

find . -type f -name "*.md" -exec sed -i.bak 's/<<ACRONYM_L>>/'"${acronym_l}"'/g' {} \;
find . -type f -name "*.js" -exec sed -i.bak 's/<<ACRONYM_L>>/'"${acronym_l}"'/g' {} \;
find . -type f -name "*.scss" -exec sed -i.bak 's/<<ACRONYM_L>>/'"${acronym_l}"'/g' {} \;
find . -type f -name "*.html" -exec sed -i.bak 's/<<ACRONYM_L>>/'"${acronym_l}"'/g' {} \;
find . -type f -name "*.json" -exec sed -i.bak 's/<<ACRONYM_L>>/'"${acronym_l}"'/g' {} \;
find . -type f -name "*.vue" -exec sed -i.bak 's/<<ACRONYM_L>>/'"${acronym_l}"'/g' {} \;

find ./ -name '*.bak' -delete

for file in $(find . -name '*.*');
do
  mv -i -f "${file}" "${file/<<ACRONYM>>/${acronym}}"
done
