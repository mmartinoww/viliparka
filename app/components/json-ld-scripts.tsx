type JsonLdScriptsProps = {
  schemas: Record<string, unknown>[];
};

export function JsonLdScripts({ schemas }: JsonLdScriptsProps) {
  return schemas.map((schema, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}
