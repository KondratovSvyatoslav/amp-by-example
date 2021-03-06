/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe("ExampleFile", function() {

  var ExampleFile = require('../../tasks/lib/ExampleFile');

  describe('created from path', function() {
    var file = ExampleFile.fromPath('src/10_Hello-world\'s/What\'s_up_100%25?.html');
    it('extracts title', function() {
      expect(file.title()).toBe("What's up 100%?");
    });
    it('extracts url', function() {
      expect(file.url()).toBe("/hello-worlds/whats_up_100/");
    });
    it('extracts url without __', function() {
    var file = ExampleFile.fromPath('src/50_Samples_%26_Templates/Test.html');
      expect(file.url()).toBe("/samples_templates/test/");
    });
    it('extracts file name', function() {
      expect(file.fileName()).toBe("What\'s_up_100%25?.html");
    });
    it('extracts category', function() {
      expect(file.category().name).toBe("Hello-world's");
    });
    it('target path', function() {
      expect(file.targetPath()).toBe("hello-worlds/whats_up_100/index.html");
    });
    it('target preview path', function() {
      expect(file.targetPreviewPath()).toBe("hello-worlds/whats_up_100/preview/index.html");
    });
    it('path on github', function() {
      expect(file.githubUrl()).toBe(
          ExampleFile.GITHUB_PREFIX + "/10_Hello-world's/What\'s_up_100%2525?.html");
    });
  });

  describe('non-example files', function() {
    var file = ExampleFile.fromPath('src/offline.html');
    it('target path in root', function() {
      expect(file.targetPath()).toBe("offline/index.html");
    });
    it('has no category', function() {
      expect(file.category()).toBe('');
    });
  });

  describe('nextFile', function() {
    it('returns next file in alphabetical order', function() {
      expect(ExampleFile.fromPath('spec/compiler/FileNameSpecFiles/a.html').nextFile().filePath)  
        .toEqual("spec/compiler/FileNameSpecFiles/b.html")
    });
    it('returns undefined when the file is the last one in alphabetical order', function() {
      expect(ExampleFile.fromPath('spec/compiler/FileNameSpecFiles/b.html').nextFile())  
        .toEqual(null)
    });
    it('returns undefined when the file does not exist', function() {
      expect(ExampleFile.fromPath('spec/compiler/FileNameSpecFiles/notExistentFile.html').nextFile())  
        .toEqual(null)
    });
    it('returns undefined when the file has no category', function() {
      expect(ExampleFile.fromPath('src/amp-form-error.html').nextFile())  
        .toEqual(null)
    });
  });

});
