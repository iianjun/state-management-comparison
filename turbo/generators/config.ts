import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("state-example", {
    description: "Create a new state management example project",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "State management library name (e.g., zustand, jotai, recoil):",
        validate: (input: string) => {
          if (input.trim() === "") return "Name is required";
          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "Description (optional):",
      },
    ],
    actions: [
      // 1. 전체 템플릿 복사
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/examples/{{ kebabCase name }}",
        base: "../../templates/nextjs-template",
        templateFiles: "../../templates/nextjs-template/**/*",
        stripExtensions: ["hbs"],

        // [중요] 이미 파일이 있어도 덮어쓰도록 설정 (에러 방지)
        force: true,

        globOptions: {
          dot: true,
          // [중요] package.json.hbs가 있다면, 원본 package.json은 복사하지 않도록 제외해야 충돌 안남
          ignore: [
            "**/node_modules/**",
            "**/.next/**",
            "**/.git/**",
            "**/dist/**",
            "**/package.json", // package.json.hbs가 대신 처리하므로 원본 json 제외
          ],
        },
        verbose: true,
      },
      // modify 액션은 제거했습니다. package.json.hbs에서 직접 처리하는 것이 훨씬 안정적입니다.

      // 2. 성공 메시지
      {
        type: "add",
        path: "{{ turbo.paths.root }}/examples/{{ kebabCase name }}/.generated",
        template: "Generated on {{ date }} for {{ name }}",
        force: true,
      },
    ],
  });
}
