import os
import re

directory = "/var/www/gr33njj.dev/html/content/blog"

for filename in os.listdir(directory):
    if filename.endswith(".mdx"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace 'language: "ru"' or 'language: "en"' with 'lang: "ru"' etc.
        new_content = re.sub(r"^language:\s*", "lang: ", content, flags=re.MULTILINE)
        
        if content != new_content:
            print(f"Updating {filename}...")
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
print("Done.")

