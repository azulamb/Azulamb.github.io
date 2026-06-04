import info from './template/info.json' with {type: 'json'};

const template = Deno.readTextFileSync("template/index.html");
const output = 'docs/index.html';

type PLATFORM = 'windows' | 'linux' | 'android' | 'web';

function renderSoftwareItem(item: {
  name: string;
  icon: string;
  github: string;
  site?: string;
  platform: PLATFORM[];
  description: string;
}) {
  return `<li><article class="software-item">
    <img src="${item.icon}" alt="${item.name} icon">
    <h3><a href="${item.site ? item.site : item.github}">${item.name}</a></h3>
    <div>
      <p>${item.description}</p>
      <ul class="platforms">
        ${item.platform.map((platform) => {
          return `<li class="platform" data-platform="${platform}">${platform}</li>`;
        }).join('')}
      </ul>
      <ul class="links">
        ${item.site ? `<li><a href="${item.site}">Website</a></li>` : ''}
        <li><a href="${item.github}">GitHub</a></li>
      </ul>
    </div>
  </article></li>`;
}

function renderSoftwareList() {
  return '<ul class="software-list">' + info.softwares.map((item) => {
    return renderSoftwareItem(item);
  }).join('') + '</ul>';
}

const html = template.replace(':SOFTWARE_LIST:', renderSoftwareList);

Deno.writeTextFileSync(output, html);
